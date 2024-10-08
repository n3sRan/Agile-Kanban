import fs from 'fs/promises';
import path from 'path';
import { Provide } from '@midwayjs/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../model/user.model'

@Provide()
export class UserService {
  private usersFilePath: string;

  constructor() {
    this.usersFilePath = path.join(__dirname, '..', '..', 'data', 'users.json');
  }

  // 加载用户
  async loadUsers(): Promise<User[]> {
    try {
      const data = await fs.readFile(this.usersFilePath, 'utf-8');
      const usersData = JSON.parse(data);
      return usersData.map((user: User) => user);
    } catch (error) {
      throw new Error('Failed to load users data.');
    }
  }

  // 保存用户
  async saveUsers(users: User[]): Promise<void> {
    try {
      const data = JSON.stringify(users, null, 2);
      await fs.writeFile(this.usersFilePath, data);
    } catch (error) {
      throw new Error('Failed to save users data.');
    }
  }

  // 登录验证
  async login(username: string, password: string): Promise<User | null> {
    const users = await this.loadUsers();
    const user = users.find((u) => u.username === username);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }
    return user;
  }

  // 添加用户
  async addUser(username: string, password: string): Promise<User> {
    const users = await this.loadUsers();

    // 检查用户名是否已存在
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      throw new Error('Username already exists. Please choose a different username.');
    }

    // 生成新的id
    const newUser: User = { id: uuidv4(), username, password };
    users.push(newUser);
    await this.saveUsers(users);
    return newUser;
  }

  // 删除用户
  async deleteUser(username: string): Promise<void> {
    const users = await this.loadUsers();

    const index = users.findIndex(user => user.username === username);
    if (index === -1) {
      throw new Error('User not found');
    }
    users.splice(index, 1);
    await this.saveUsers(users);
  }
}