namespace webapp.Models
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string House { get; set; }

        public IEnumerable<Meet> Meets { get; set; }
    }
}
