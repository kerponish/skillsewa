import { db } from "./config/db.js";
import Worker from "./models/worker.js";

const testWorkers = async () => {
  try {
    await db();
    
    // Check existing workers
    const existingWorkers = await Worker.findAll();
    console.log('Existing workers:', existingWorkers.length);
    
    if (existingWorkers.length === 0) {
      // Create some test workers
      const testWorkers = [
        {
          firstname: "John",
          secondname: "Doe",
          email: "john.doe@example.com",
          phone: "123-456-7890",
          skills: "Plumbing, Electrical",
          experience: "5 years",
          hourlyRate: 25.00,
          location: "New York",
          availability: "available"
        },
        {
          firstname: "Jane",
          secondname: "Smith",
          email: "jane.smith@example.com",
          phone: "098-765-4321",
          skills: "Carpentry, Painting",
          experience: "3 years",
          hourlyRate: 30.00,
          location: "Los Angeles",
          availability: "available"
        },
        {
          firstname: "Mike",
          secondname: "Johnson",
          email: "mike.johnson@example.com",
          phone: "555-123-4567",
          skills: "HVAC, Maintenance",
          experience: "7 years",
          hourlyRate: 35.00,
          location: "Chicago",
          availability: "unavailable"
        }
      ];
      
      await Worker.bulkCreate(testWorkers);
      console.log('Test workers created successfully');
    }
    
    // Fetch and display all workers
    const allWorkers = await Worker.findAll();
    console.log('All workers:', JSON.stringify(allWorkers, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
};

testWorkers(); 