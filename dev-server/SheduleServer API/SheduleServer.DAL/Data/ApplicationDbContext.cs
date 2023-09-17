using Microsoft.EntityFrameworkCore;
using SheduleServer.Domain.Entity.Shedule;

namespace SheduleServer.DAL.Data
{
	public class ApplicationDbContext : DbContext
	{
		DbSet<Group> Groups { get; set; }
		DbSet<Lesson> Lessons { get; set; }
		DbSet<LessonTime> LessonTimes { get; set; }
		DbSet<Professor> Professors { get; set; }
		DbSet<SheduleLesson> SheduleLessons { get; set; }
		DbSet<SheduleDay> SheduleDays { get; set; }
		DbSet<SheduleTemplate> SheduleTemplates { get; set; }
		DbSet<University> Universities { get; set; }

        public ApplicationDbContext()
        {
            Database.EnsureCreated();
        }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=ToDoAppDb;Username=postgres;Password=123456");
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder); 
		}
	}
}
