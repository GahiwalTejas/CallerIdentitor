﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace numberDetector.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class TrueCallerEntities1 : DbContext
    {
        public TrueCallerEntities1()
            : base("name=TrueCallerEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Spam> Spams { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}