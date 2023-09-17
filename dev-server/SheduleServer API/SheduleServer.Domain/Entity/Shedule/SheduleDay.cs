using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SheduleServer.Domain.Entity.Shedule
{
	public class SheduleDay
	{
        public int Id { get; set; }
        public DayType DayType { get; set; }

        public int SheduleTemplateId { get; set; }
        public SheduleTemplate SheduleTemplate { get; set; }

		public virtual IEnumerable<SheduleLessonsInDay> SheduleLessonsInDays { get; set; }
	}

    public enum DayType
    {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }
}
