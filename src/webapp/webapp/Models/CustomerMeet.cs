namespace webapp.Models
{
    public class CustomerMeet
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int MeetId { get; set; }

        public User Customer { get; set; }
        public Meet Meet { get; set; }
    }
}
