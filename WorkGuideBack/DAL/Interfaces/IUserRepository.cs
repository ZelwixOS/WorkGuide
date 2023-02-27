﻿namespace DAL.Interfaces
{
    using DAL.Entities;
    using System;
    using System.Linq;

    public interface IUserRepository
    {
        public IQueryable<User> GetItems();

        public User GetItem(Guid id);

        public User UpdateUser(User user);
    }
}
