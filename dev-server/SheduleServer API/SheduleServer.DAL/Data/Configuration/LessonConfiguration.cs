using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SheduleServer.Domain.Entity.Shedule;

namespace SheduleServer.DAL.Data.Configuration
{
	public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
	{
		public void Configure(EntityTypeBuilder<Lesson> builder)
		{
			throw new NotImplementedException();
		}
	}
}
