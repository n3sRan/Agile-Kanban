import { Controller, Get, Post, Body, Param, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/users')
export class UserController {
    @Inject()
    userService: UserService;

    // 返回所有用户列表
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

    //根据id返回用户实例
    @Get('/:id')
    async getUser(@Param('id') id: string) {
        const users = await this.userService.loadUsers();
        const user = users.find((u) => u.id === id);
        if (user) {
            return user;
        } else {
            throw new Error('User not found');
        }
    }
}