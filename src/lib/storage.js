import localforage from 'localforage';

// 初始化不同的存储实例
const stores = {
  projects: localforage.createInstance({
    name: 'indie-dev',
    storeName: 'projects'
  }),
  features: localforage.createInstance({
    name: 'indie-dev',
    storeName: 'features'
  }),
  tasks: localforage.createInstance({
    name: 'indie-dev',
    storeName: 'tasks'
  })
};

// 数据模型定义
const createModel = (data, type) => {
  const baseModel = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  switch (type) {
    case 'project':
      return {
        ...baseModel,
        name: '',
        startDate: new Date().toISOString().split('T')[0],
        progress: 0,
        excitement: 3,
        difficulty: 3,
        status: "未开始",
        ...data
      };
    case 'feature':
      return {
        ...baseModel,
        projectId: null, // 关联的项目ID
        title: '',
        description: '',
        completed: false,
        order: 0,
        ...data
      };
    case 'task':
      return {
        ...baseModel,
        featureId: null, // 关联的功能ID
        title: '',
        completed: false,
        level: 0,
        parentId: null,
        order: 0,
        ...data
      };
    default:
      return { ...baseModel, ...data };
  }
};

// 项目相关的存储操作
export const projectStorage = {
  async getAll() {
    return await stores.projects.getItem('projectList') || [];
  },

  async save(projects) {
    const updatedProjects = projects.map(project => ({
      ...createModel(project, 'project'),
      updatedAt: new Date().toISOString()
    }));
    await stores.projects.setItem('projectList', updatedProjects);
    return updatedProjects;
  },

  async getProject(id) {
    const projects = await this.getAll();
    return projects.find(p => p.id === Number(id));
  },

  async getCurrentProject() {
    return await stores.projects.getItem('currentProject');
  },

  async setCurrentProject(project) {
    await stores.projects.setItem('currentProject', project);
  },

  async deleteProject(id) {
    const projects = await this.getAll();
    const newProjects = projects.filter(p => p.id !== id);
    await this.save(newProjects);

    // 删除相关的功能和任务
    const features = await featureStorage.getAll(id);
    for (const feature of features) {
      await taskStorage.deleteAllByFeature(feature.id);
    }
    await featureStorage.deleteAllByProject(id);

    return newProjects;
  }
};

// 功能特性相关的存储操作
export const featureStorage = {
  async getAll(projectId) {
    const key = `features-${projectId}`;
    return await stores.features.getItem(key) || [];
  },

  async save(projectId, features) {
    const key = `features-${projectId}`;
    const updatedFeatures = features.map((feature, index) => ({
      ...createModel(feature, 'feature'),
      projectId,
      order: index,
      updatedAt: new Date().toISOString()
    }));
    await stores.features.setItem(key, updatedFeatures);
    return updatedFeatures;
  },

  async deleteAllByProject(projectId) {
    const key = `features-${projectId}`;
    await stores.features.removeItem(key);
  }
};

// 任务相关的存储操作
export const taskStorage = {
  async getAll(featureId) {
    const key = `tasks-${featureId}`;
    return await stores.tasks.getItem(key) || [];
  },

  async save(featureId, tasks) {
    const key = `tasks-${featureId}`;
    const updatedTasks = tasks.map((task, index) => ({
      ...createModel(task, 'task'),
      featureId,
      order: index,
      updatedAt: new Date().toISOString()
    }));
    await stores.tasks.setItem(key, updatedTasks);
    return updatedTasks;
  },

  async deleteAllByFeature(featureId) {
    const key = `tasks-${featureId}`;
    await stores.tasks.removeItem(key);
  }
};

// 数据迁移和版本控制
export const migrateData = async () => {
  try {
    // 获取当前数据版本
    const version = await stores.projects.getItem('version') || 0;

    if (version < 1) {
      // 迁移到版本1：添加ID和时间戳
      const projects = await projectStorage.getAll();
      const updatedProjects = projects.map(p => createModel(p, 'project'));
      await projectStorage.save(updatedProjects);

      // 更新版本号
      await stores.projects.setItem('version', 1);
    }

    // 添加更多版本迁移逻辑...

  } catch (error) {
    console.error('数据迁移失败:', error);
  }
};

// 数据导出
export const exportData = async () => {
  const projects = await projectStorage.getAll();
  const exportData = {
    version: 1,
    timestamp: new Date().toISOString(),
    projects: await Promise.all(projects.map(async project => {
      const features = await featureStorage.getAll(project.id);
      const featuresWithTasks = await Promise.all(features.map(async feature => ({
        ...feature,
        tasks: await taskStorage.getAll(feature.id)
      })));
      return {
        ...project,
        features: featuresWithTasks
      };
    }))
  };
  return exportData;
};

// 数据导入
export const importData = async (data) => {
  if (!data.version || !data.projects) {
    throw new Error('无效的数据格式');
  }

  try {
    for (const project of data.projects) {
      await projectStorage.save([project]);

      if (project.features) {
        for (const feature of project.features) {
          await featureStorage.save(project.id, [feature]);

          if (feature.tasks) {
            await taskStorage.save(feature.id, feature.tasks);
          }
        }
      }
    }
  } catch (error) {
    console.error('数据导入失败:', error);
    throw error;
  }
}; 