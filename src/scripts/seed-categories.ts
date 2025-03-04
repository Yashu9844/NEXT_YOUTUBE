import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryName = [
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Education",
    "Technology",
    "Entertainment",
    "Vlogs",
    "Movies",
    "Science",
    "Health & Fitness",
    "Travel",
    "Food",
    "Business",
    "Finance",
    "Motivation",
    "History",
    "DIY & Crafts",
    "Comedy",
    "Lifestyle",
    "Fashion & Beauty",
    "Podcasts",
    "Documentary",
    "Reviews",
    "Auto & Vehicles",
    "Spirituality",
    "Programming",
    "Art & Design",
    "Animals & Pets"
  ];


  async function main(){
    try{

        const values = categoryName.map((name)=>({
            name,
            description:`Videoes related to ${name.toLowerCase()}`
        }))
         
        await db.insert(categories).values(values)
        console.log('seeding completed')

    }catch(e){
        
        console.log('the seeding throwing an error in scripts',e)

 process.exit(1)

    }
  }

  main()
  