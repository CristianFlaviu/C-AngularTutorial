using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Model;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username.Equals(username));

            if (user == null)
            {
                return null;
            }

            if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;
        }


        private bool VerifyPassword(string password, byte[] userPasswordHash, byte[] userPasswordSalt)
        {
            Console.WriteLine("Parola este: " + password+ "  leghth: " +password.Length);

           Console.WriteLine(password.ElementAt(password.Length-1));

            using (var hmac = new System.Security.Cryptography.HMACSHA512(userPasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));


                Console.WriteLine("Computed Hash : ");
                for (int i = 0; i < computedHash.Length; i++)
                {
                    Console.Write(computedHash[i] + " ");

                }
                Console.WriteLine("\n\n Password Hash");

                for (int i = 0; i < userPasswordHash.Length; i++)
                {
                    Console.Write(userPasswordHash[i]+ " ");

                }
               
                Console.WriteLine();

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != userPasswordHash[i])
                    {
                        Console.WriteLine("difrente intre "+ computedHash[i]+" "+userPasswordHash[i]);
                        return false;
                    }
                }

                Console.WriteLine("\n\n");
            }

            return true;
        }



        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash;
            byte[] passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        public async  Task<bool> UserExists(string username)
        {

            if (await _context.Users.AnyAsync(x => x.Username == username))
            {

                return true;
            }

            return false;
        }
    }
}
