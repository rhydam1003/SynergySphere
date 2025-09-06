import dotenv from 'dotenv';
dotenv.config();

import { connectDatabase, disconnectDatabase } from '../config/database';
import User from '../models/User.model';
import Project from '../models/Project.model';
import Task from '../models/Task.model';
import { hashPassword } from '../utils/password';
import { logger } from '../utils/logger';

const seedDatabase = async () => {
  try {
    await connectDatabase();
    
    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    
    // Create users
    const adminPassword = await hashPassword('Admin123!');
    const userPassword = await hashPassword('User123!');
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@synergysphere.com',
      passwordHash: adminPassword,
      roles: ['admin', 'manager', 'member'],
    });
    
    const manager = await User.create({
      name: 'Project Manager',
      email: 'manager@synergysphere.com',
      passwordHash: userPassword,
      roles: ['manager', 'member'],
    });
    
    const member = await User.create({
      name: 'Team Member',
      email: 'member@synergysphere.com',
      passwordHash: userPassword,
      roles: ['member'],
    });
    
    // Create projects
    const project1 = await Project.create({
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      owner: admin._id,
      members: [
        { user: admin._id, role: 'manager', joinedAt: new Date() },
        { user: manager._id, role: 'manager', joinedAt: new Date() },
        { user: member._id, role: 'member', joinedAt: new Date() },
      ],
    });
    
    const project2 = await Project.create({
      name: 'Mobile App Development',
      description: 'Native iOS and Android apps',
      owner: manager._id,
      members: [
        { user: manager._id, role: 'manager', joinedAt: new Date() },
        { user: member._id, role: 'member', joinedAt: new Date() },
      ],
    });
    
    // Create tasks
    await Task.create([
      {
        project: project1._id,
        title: 'Design Homepage Mockup',
        description: 'Create initial design concepts for the new homepage',
        assignee: member._id,
        status: 'in_progress',
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdBy: manager._id,
      },
      {
        project: project1._id,
        title: 'Setup Development Environment',
        description: 'Configure Docker, database, and build tools',
        assignee: member._id,
        status: 'done',
        priority: 'high',
        createdBy: admin._id,
      },
      {
        project: project2._id,
        title: 'User Authentication',
        description: 'Implement JWT-based authentication',
        status: 'todo',
        priority: 'high',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        createdBy: manager._id,
      },
    ]);
    
    logger.info('✅ Database seeded successfully');
    logger.info('Test accounts:');
    logger.info('  Admin: admin@synergysphere.com / Admin123!');
    logger.info('  Manager: manager@synergysphere.com / User123!');
    logger.info('  Member: member@synergysphere.com / User123!');
    
  } catch (error) {
    logger.error('Seed failed:', error as Error);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
};

seedDatabase();
