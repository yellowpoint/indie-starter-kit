import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getParams } from "@/lib/utils";
const prisma = new PrismaClient();

export async function dynamicCrud(req) {
  const params = await getParams(req);
  const model = params.model;
  const action = params.action;
  const page = parseInt(params.page || "1");
  const pageSize = parseInt(params.pageSize || "10");
  const searchTerm = params.searchTerm || "";
  const data = params.data;

  const id = params.id || data?.id;

  if (!model || !action) {
    return NextResponse.json({
      code: 1,
      data: "Missing model or action parameter"
    }, { status: 400 });
  }

  if (!(model in prisma)) {
    return NextResponse.json({
      code: 1,
      data: "Invalid model"
    }, { status: 400 });
  }

  const prismaModel = prisma[model];

  try {
    switch (action) {
      case "create":
        const createdItem = await prismaModel.create({
          data: processRelationalData(data, "create"),
          include: getIncludeObject(prismaModel),
        });
        return NextResponse.json({ code: 0, data: createdItem });

      case "read":
        if (id) {
          const item = await prismaModel.findUnique({
            where: { id },
            include: getIncludeObject(prismaModel),
          });
          return NextResponse.json({ code: 0, data: item });
        } else {
          const where = searchTerm
            ? {
              OR: [
                { name: { contains: searchTerm, mode: "insensitive" } },
                {
                  description: { contains: searchTerm, mode: "insensitive" },
                },
              ],
            }
            : {};

          const [total, list] = await Promise.all([
            prismaModel.count({ where }),
            prismaModel.findMany({
              where,
              skip: (page - 1) * pageSize,
              take: pageSize,
              orderBy: { createdAt: "desc" },
              select: getListSelectObject(model),
            }),
          ]);

          return NextResponse.json({
            code: 0,
            data: {
              list,
              total,
              page,
              pageSize,
            }
          });
        }

      case "update":
        if (!id) {
          return NextResponse.json({
            code: 1,
            data: "Missing id for update"
          }, { status: 400 });
        }
        const updatedItem = await prismaModel.update({
          where: { id },
          data: processRelationalData(data, "update"),
          include: getIncludeObject(prismaModel),
        });
        return NextResponse.json({ code: 0, data: updatedItem });

      case "delete":
        if (!id) {
          return NextResponse.json({
            code: 1,
            data: "Missing id for delete"
          }, { status: 400 });
        }
        const deletedItem = await prismaModel.delete({ where: { id } });
        return NextResponse.json({ code: 0, data: deletedItem });

      default:
        return NextResponse.json({
          code: 1,
          data: "Invalid action"
        }, { status: 400 });
    }
  } catch (error) {
    console.error(`Error in ${action} operation for ${model}:`, error);
    return NextResponse.json({
      code: 1,
      data: `Failed to ${action} ${model}: ${error.message}`
    }, { status: 500 });
  }
}

function processRelationalData(data, action) {
  const modelName =
    Object.keys(data).length > 0
      ? Prisma.dmmf.datamodel.models.find((m) =>
        m.fields.some((f) => data[f.name] !== undefined)
      )?.name
      : "";

  if (!modelName) return data;

  const model = Prisma.dmmf.datamodel.models.find((m) => m.name === modelName);
  const relationFields = model?.fields.filter((f) => f.kind === "object") || [];

  const result = { ...data };

  relationFields.forEach((field) => {
    const fieldData = data[field.name];
    if (!fieldData) return;

    if (Array.isArray(fieldData)) {
      if (action === "update") {
        result[field.name] = {
          deleteMany: {},
          create: fieldData.map(({ id, createdAt, ...item }) => item),
        };
      } else {
        result[field.name] = {
          create: fieldData.map(({ id, createdAt, ...item }) => item),
        };
      }
    } else if (typeof fieldData === "object") {
      if (action === "update") {
        result[field.name] = { connect: { id: fieldData.id } };
      } else {
        result[field.name] = { connect: { id: fieldData.id } };
      }
    }
  });

  return result;
}

function getIncludeObject(model) {
  const modelName = model.name;
  const dmmf = Prisma.dmmf.datamodel.models.find((m) => m.name === modelName);

  if (!dmmf) {
    return {};
  }

  const relations = dmmf.fields.filter((field) => field.kind === "object");

  return relations.reduce((acc, relation) => {
    if (relation.isList) {
      acc[relation.name] = {
        orderBy: ["keywords"].includes(relation.name)
          ? { order: "asc" }
          : { createdAt: "desc" },
      };
    } else {
      acc[relation.name] = true;
    }
    return acc;
  }, {});
}

function getListSelectObject(modelName) {
  const model = Prisma.dmmf.datamodel.models.find((m) => m.name === modelName);
  if (!model) return undefined;

  const selectObject = {
    id: true,
    createdAt: true,
    updatedAt: true,
  };

  model.fields
    .filter((f) => f.kind === "scalar")
    .forEach((field) => {
      selectObject[field.name] = true;
    });

  model.fields
    .filter((f) => f.kind === "object" && f.isList)
    .forEach((field) => {
      selectObject[field.name] = { orderBy: { createdAt: "desc" } };
    });

  return selectObject;
}

// select 精确指定要返回的字段，包括关系字段；默认不返回任何字段，必须明确指定要返回的字段
// include 默认返回所有标量字段，只能选择是否加载整个关系
