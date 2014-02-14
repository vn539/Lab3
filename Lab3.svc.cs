using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WcfService1
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    public class Service1 : IService1
    {
        [WebInvoke(Method = "GET",ResponseFormat = WebMessageFormat.Json,UriTemplate = "data/{id}")]

        public MenuItem GetData2(string id)
        {
            // lookup person with the requested id 
            //return new Person()
            //{
            //    Id = Convert.ToInt32(id),
                
                
            //    Name = "Student"+id
                
            //};

            var retMenuItem = new MenuItem() {Id = id};

            switch (id)
            {
                case "French Fries":
                    retMenuItem.Price = "10";
                    break;

                case "Sweet Potato Fries":
                    retMenuItem.Price = "2.50";
                    break;

                case "Spinich Dip":
                    retMenuItem.Price = "3.50";
                    break;

                case "Garden Salad":
                    retMenuItem.Price = "5.50";
                    break;

                case "Ceaser Salad":
                    retMenuItem.Price = "6.50";
                    break;

                case "Chicken Pasta":
                    retMenuItem.Price = "11.50";
                    break;

                case "Chicken Sandwich":
                    retMenuItem.Price = "8.50";
                    break;

                default:
                    retMenuItem.Price = "0";
                    break;
            }

            return retMenuItem;
        }


        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }

       
        public string GetDateTime()
        {
            return DateTime.Now.ToString();
        }
    }


    public class Person
    {

        public int Id { get; set; }

        public string Name { get; set; }

    }

    public class MenuItem
    {

        public string Id { get; set; }

        public string Price { get; set; }

    }
}
