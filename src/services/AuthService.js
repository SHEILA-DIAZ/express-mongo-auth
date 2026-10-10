import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userRepository from '../repositories/userRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

class AuthService {

    async signUp({ email, password, name, lastName, phoneNumber, birthdate, url_profile, adress }) {

        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            throw Object.assign(new Error('El usuario ya existe'), { status: 409 });
        }

        // Validación de contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&*@]).{8,}$/;

        if (!passwordRegex.test(password)) {
            throw Object.assign(new Error(
                'La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial (# $ % & * @)'
            ), { status: 400 });
        }

        // Validación de campos requeridos
        if (!lastName || !phoneNumber || !birthdate) {
            throw Object.assign(new Error('lastName, phoneNumber y birthdate son obligatorios'), { status: 400 });
        }

        const saltRounds = parseInt(
            process.env.BCRYPT_SALT_ROUNDS ?? '10',
            10
        );

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let userRole = await roleRepository.findByName('user');

        if (!userRole) {
            userRole = await roleRepository.create({
                name: 'user'
            });
        }

        const user = await userRepository.create({
            email,
            password: hashedPassword,
            name,
            lastName,
            phoneNumber,
            birthdate,
            url_profile,
            adress,
            roles: [userRole._id]
        });

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            url_profile: user.url_profile,
            adress: user.adress,
            roles: ['user']
        };
    }

    async signIn({ email, password }) {

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
        }

        const token = jwt.sign(
            {
                sub: user._id.toString(),
                roles: user.roles.map(role => role.name)
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1h',
                algorithm: 'HS256'
            }
        );

        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                roles: user.roles.map(role => role.name)
            }
        };
    }
}

export default new AuthService();
