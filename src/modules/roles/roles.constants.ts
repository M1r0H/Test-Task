export enum AvailableRoles {
  Admin = 'Admin',
  Editor = 'Editor',
  Viewer = 'Viewer',
}

export enum AvailablePermissions {
  UsersRead = 'users.read',
  UsersDelete = 'users.delete',
  ArticlesRead = 'articles.read',
  ArticlesCreate = 'articles.create',
  ArticlesUpdate = 'articles.update',
  ArticlesDelete = 'articles.delete',
  SelfDelete = 'self.delete',
  SelfEdit = 'self.edit',
}

export enum Compare {
  some = 'some',
  every = 'every',
}
