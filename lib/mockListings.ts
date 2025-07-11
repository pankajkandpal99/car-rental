import { Listing } from "@/types/db-types";

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Toyota Camry 2022",
    description:
      "Excellent condition with only 15,000 miles. Automatic transmission, leather seats, and premium sound system.",
    price: 45,
    location: "New York",
    images: ["/cars/camry.jpg"],
    status: "pending",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-15"),
    userId: 1,
  },
  {
    id: "2",
    title: "Honda Accord 2021",
    description:
      "Well-maintained sedan with great fuel efficiency. Perfect for city driving.",
    price: 40,
    location: "Los Angeles",
    images: ["/cars/accord.jpg"],
    status: "approved",
    createdAt: new Date("2023-04-10"),
    updatedAt: new Date("2023-06-20"),
    userId: 2,
  },
  {
    id: "3",
    title: "Ford Mustang 2020",
    description:
      "Sporty convertible with powerful V8 engine. Low mileage and garage kept.",
    price: 75,
    location: "Miami",
    images: ["/cars/mustang.jpg"],
    status: "rejected",
    createdAt: new Date("2023-03-22"),
    updatedAt: new Date("2023-05-30"),
    userId: 3,
  },
  {
    id: "4",
    title: "Tesla Model 3 2023",
    description:
      "Fully electric with autopilot. Includes premium connectivity package.",
    price: 90,
    location: "San Francisco",
    images: ["/cars/tesla.jpg"],
    status: "approved",
    createdAt: new Date("2023-06-05"),
    updatedAt: new Date("2023-07-12"),
    userId: 4,
  },
  {
    id: "5",
    title: "Jeep Wrangler 2021",
    description:
      "4x4 off-road capable with new tires. Perfect for adventure trips.",
    price: 65,
    location: "Denver",
    images: ["/cars/jeep.jpg"],
    status: "pending",
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-01"),
    userId: 5,
  },
  {
    id: "6",
    title: "BMW 3 Series 2022",
    description:
      "Luxury sedan with premium package. Excellent driving dynamics.",
    price: 85,
    location: "Chicago",
    images: ["/cars/bmw.jpg"],
    status: "approved",
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-06-15"),
    userId: 6,
  },
  {
    id: "7",
    title: "Subaru Outback 2021",
    description:
      "All-wheel drive with plenty of cargo space. Great for families.",
    price: 55,
    location: "Seattle",
    images: ["/cars/subaru.jpg"],
    status: "pending",
    createdAt: new Date("2023-07-10"),
    updatedAt: new Date("2023-07-10"),
    userId: 7,
  },
  {
    id: "8",
    title: "Mercedes-Benz C-Class 2022",
    description: "Luxury interior with advanced safety features. Low mileage.",
    price: 95,
    location: "Boston",
    images: ["/cars/mercedes.jpg"],
    status: "approved",
    createdAt: new Date("2023-04-15"),
    updatedAt: new Date("2023-05-22"),
    userId: 8,
  },
  {
    id: "9",
    title: "Toyota RAV4 2021",
    description: "Reliable SUV with excellent safety ratings. Good condition.",
    price: 50,
    location: "Austin",
    images: ["/cars/rav4.jpg"],
    status: "rejected",
    createdAt: new Date("2023-03-18"),
    updatedAt: new Date("2023-04-25"),
    userId: 9,
  },
  {
    id: "10",
    title: "Chevrolet Tahoe 2020",
    description: "Spacious 7-seater SUV. Perfect for large groups.",
    price: 70,
    location: "Houston",
    images: ["/cars/tahoe.jpg"],
    status: "approved",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-03-15"),
    userId: 10,
  },
  {
    id: "11",
    title: "Volkswagen Golf 2021",
    description: "Compact and efficient. Great for city driving.",
    price: 35,
    location: "Portland",
    images: ["/cars/golf.jpg"],
    status: "pending",
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05"),
    userId: 11,
  },
  {
    id: "12",
    title: "Audi Q5 2022",
    description:
      "Premium SUV with quattro all-wheel drive. Excellent condition.",
    price: 80,
    location: "Washington DC",
    images: ["/cars/audi.jpg"],
    status: "approved",
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-06-18"),
    userId: 12,
  },
  {
    id: "13",
    title: "Hyundai Tucson 2023",
    description: "Brand new with all the latest features. Great value.",
    price: 45,
    location: "Atlanta",
    images: ["/cars/tucson.jpg"],
    status: "pending",
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-07-15"),
    userId: 13,
  },
  {
    id: "14",
    title: "Lexus RX 350 2021",
    description: "Luxury SUV with smooth ride quality. Well-maintained.",
    price: 75,
    location: "Dallas",
    images: ["/cars/lexus.jpg"],
    status: "approved",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-05-10"),
    userId: 14,
  },
  {
    id: "15",
    title: "Nissan Altima 2022",
    description: "Comfortable sedan with great fuel economy. Low mileage.",
    price: 40,
    location: "Phoenix",
    images: ["/cars/altima.jpg"],
    status: "rejected",
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-04-20"),
    userId: 15,
  },
  {
    id: "16",
    title: "Kia Telluride 2022",
    description:
      "Spacious 3-row SUV with premium features. Like new condition.",
    price: 65,
    location: "Denver",
    images: ["/cars/telluride.jpg"],
    status: "approved",
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-06-05"),
    userId: 16,
  },
  {
    id: "17",
    title: "Ford F-150 2021",
    description: "Powerful truck with towing package. Great for hauling.",
    price: 60,
    location: "Nashville",
    images: ["/cars/f150.jpg"],
    status: "pending",
    createdAt: new Date("2023-06-20"),
    updatedAt: new Date("2023-06-20"),
    userId: 17,
  },
  {
    id: "18",
    title: "Mazda CX-5 2022",
    description: "Sporty crossover with premium interior. Excellent handling.",
    price: 50,
    location: "San Diego",
    images: ["/cars/mazda.jpg"],
    status: "approved",
    createdAt: new Date("2023-04-18"),
    updatedAt: new Date("2023-05-22"),
    userId: 18,
  },
  {
    id: "19",
    title: "Volvo XC60 2021",
    description: "Safety-focused SUV with luxury features. Well-maintained.",
    price: 70,
    location: "Minneapolis",
    images: ["/cars/volvo.jpg"],
    status: "pending",
    createdAt: new Date("2023-07-08"),
    updatedAt: new Date("2023-07-08"),
    userId: 19,
  },
  {
    id: "20",
    title: "Porsche 911 2020",
    description: "Iconic sports car with excellent performance. Garage kept.",
    price: 150,
    location: "Las Vegas",
    images: ["/cars/porsche.jpg"],
    status: "approved",
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2023-03-10"),
    userId: 20,
  },
];
