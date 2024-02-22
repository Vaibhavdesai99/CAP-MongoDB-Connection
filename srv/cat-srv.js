const { MongoClient } = require("mongodb");
const cds = require("@sap/cds");

// Function to connect to MongoDB Atlas
async function connectToMongoDB() {
  const uri =
    "mongodb+srv://vaibhavdesai510:fId08hK8Ygx3EUC3@cluster0.wkehbqd.mongodb.net/";

  try {
    // Connect to MongoDB using MongoClient
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect(); // Await connection establishment
    console.log("Connected to MongoDB Atlas"); // Log success
    return client.db(); // Return the connected database instance
  } catch (error) {
    // Handle connection errors
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error; // Propagate the error
  }
}

// Define the CAP service implementation
module.exports = cds.service.impl(async function () {
  // Handler for POST requests to insert data
  this.on("POST", "mogodb", async (req) => {
    const db = await connectToMongoDB(); // Connect to MongoDB
    const collection = db.collection("Cluster0"); // Get collection reference

    try {
      const insertResult = await collection.insertOne(req.data); // Insert data
      console.log("Inserted document ID:", insertResult.insertedId); // Log success
      return { message: "Data inserted successfully" }; // Return success message
    } catch (error) {
      // Handle insertion errors
      console.error("Error inserting data:", error);
      throw new Error("Error inserting data"); // Propagate the error
    } finally {
      await db.client.close(); // Close the MongoDB client connection
      console.log("Disconnected from MongoDB Atlas"); // Log disconnection
    }
  });

  // Handler for GET requests to fetch data
  this.on("READ", "mogodb", async (req) => {
    const db = await connectToMongoDB(); // Connect to MongoDB
    const collection = db.collection("Cluster0"); // Get collection reference

    try {
      const data = await collection.find().toArray(); // Fetch data from collection
      console.log("Fetched data:", data); // Log fetched data
      return data; // Return fetched data
    } catch (error) {
      // Handle fetching errors
      console.error("Error fetching data:", error);
      throw new Error("Error fetching data"); // Propagate the error
    } finally {
      await db.client.close(); // Close the MongoDB client connection
      console.log("Disconnected from MongoDB Atlas"); // Log disconnection
    }
  });
});
