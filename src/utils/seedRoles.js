import roleRepository from '../repositories/RoleRepository.js';

export default async function seedRoles() {

    for (const name of ['user', 'admin']) {
        if (!(await roleRepository.findByName(name))) {
            try {
                await roleRepository.create({ name });
            } catch (error) {
                if (error.code !== 11000) throw error;
            }
        }
    }
}
