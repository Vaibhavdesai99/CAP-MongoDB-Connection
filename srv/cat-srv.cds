using myProject from '../db/schema';

service mongo {

    entity MongoInformation as projection on myProject.Products;

}