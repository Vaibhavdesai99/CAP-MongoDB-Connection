using myProject from '../db/schema';

service mongo {

    entity mogodb as projection on myProject.Products;

}