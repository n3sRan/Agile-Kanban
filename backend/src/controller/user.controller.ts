import { Controller, Get, Post, Body, Param, Inject, Del } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/users')
export class UserController {
    @Inject()
    userService: UserService;

    // 返回用户列表
    @Get('/')
    async listUsers() {
        return await this.userService.loadUsers();
    }
    // 登陆验证
    @Post('/login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        const user = await this.userService.login(username, password);
        if (user) {
            return { message: 'Login successful', user };
        } else {
            throw new Error('Login failed');
        }
    }

    // 创建新用户
    @Post('/')
    async createUser(@Body('username') username: string, @Body('password') password: string) {
        const user = await this.userService.addUser(username, password);
        return { message: 'User created', user };
    }

    // 根据用户名返回用户
    @Get('/:username')
    async getUser(@Param('username') username: string) {
        const users = await this.userService.loadUsers();
        const user = users.find((u) => u.username === username);
        if (user) {
            return user;
        } else {
            throw new Error('User not found');
        }
    }

    // 注销用户
    @Del('/:username')
    async deleteUser(@Param('username') username: string) {
        await this.userService.deleteUser(username);
        return { message: 'User deleted' };
    }
}