using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using numberDetector.Models;

namespace numberDetector.Controllers
{
    [RoutePrefix("api/Users")]
    public class UsersController : ApiController
    {
        private TrueCallerEntities1 db = new TrueCallerEntities1();
        //api/Users/Login
        [Route("Login")]
        [HttpPost]
        public IHttpActionResult Login([FromBody] User user)
        {
            var UserBy = (from users in db.Users
                          where users.Email == user.Email && users.Password == user.Password
                          select users).FirstOrDefault();

            if (UserBy != null)
            {
                return Ok(UserBy);
            }
            else
            {
                return NotFound();
            }


        }



        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UserId)
            {
                return BadRequest();
            }

            db.Entry(user).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users/Registration
        [HttpPost]
        [Route("Registration")]

        public String Registration([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return "Invalid Credential";
            }

            db.Users.Add(user);
            if (db.SaveChanges() != 0)
                // return Ok(user);
                return "Registration Successfully";
            else
                return "Invalid Credential";
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.UserId == id) > 0;
        }
    }
}