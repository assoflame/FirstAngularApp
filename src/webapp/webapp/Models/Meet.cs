namespace webapp.Models
{
    public class Meet
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DateTime { get; set; }

        public IEnumerable<CustomerMeet> CustomersMeets { get; set; }
        public Place Place { get; set; }
    }
}
