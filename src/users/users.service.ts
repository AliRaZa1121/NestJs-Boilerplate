import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private _usersRepository: Repository<UserEntity>,
    ) { }

    async validateUser(data: number | any): Promise<any> {
        return await this._usersRepository.findOne(data);
    }

    async checkIfUserExists(data): Promise<any> {
        return await this._usersRepository.findOne({where: data});
    }

    async create(data) {
        return await this._usersRepository
            .save(data)
            .then((res) => res)
            .catch((e) => console.log(e));
    }

}
