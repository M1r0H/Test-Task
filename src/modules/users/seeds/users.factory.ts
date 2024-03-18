import { faker } from '@faker-js/faker';
import { Role } from '@modules/roles/entities';
import { User } from '@modules/users/entities';
import bcrypt from 'bcrypt';
import { UserStatusType } from '@modules/users/users.constants';
import { UniqueEnforcer } from 'enforce-unique';

export default class UsersFactory {
  private roles = [
    {
      id: '3b97de17-fe32-401d-921a-07887de64995',
      name: 'Admin',
      permissions: ['users.read', 'users.delete', 'articles.read', 'articles.delete', 'self.edit'],
    },
    {
      id: '358a716c-5f22-498f-8510-982bd55fc804',
      name: 'Editor',
      permissions: ['articles.read', 'articles.create', 'articles.update', 'articles.delete', 'self.delete', 'self.edit'],
    },
    {
      id: 'feba75a5-f30c-4ae7-bbca-6b1e7571adbb',
      name: 'Viewer',
      permissions: ['users.read', 'articles.read', 'self.delete', 'self.edit'],
    },
  ];

  public create(count: number): { users: User[]; roles: Role[] } {
    const usersList = [];
    const roles = [];
    const uniqueEnforcerEmail = new UniqueEnforcer();

    for (let i = 0; i < this.roles.length; i++) {
      const role = new Role();

      role.id = this.roles[i].id;
      role.name = this.roles[i].name;
      role.permissions = this.roles[i].permissions;

      roles.push(role);
    }

    for (let i = 0; i < count; i++) {
      const user = new User();
      const rolesWithoutAdmin = roles.filter((role) => role.name !== 'Admin');
      const email = uniqueEnforcerEmail.enforce(faker.internet.email);

      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.email = email;
      user.roleId = faker.helpers.arrayElement(rolesWithoutAdmin).id;
      user.status = UserStatusType.active;
      user.password = bcrypt.hashSync(email, bcrypt.genSaltSync());

      usersList.push(user);
    }

    return {
      roles,
      users: [
        ...usersList,
        {
          firstName: 'admin',
          lastName: 'admin',
          email: 'admin@gmail.com',
          roleId: roles.find((role) => role.name === 'Admin').id,
          status: 'active',
          comment: 'I am the law here!!!',
          password: bcrypt.hashSync('admin', bcrypt.genSaltSync()),
        },
      ],
    };
  }
}
