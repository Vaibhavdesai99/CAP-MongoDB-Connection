namespace myProject;

entity Products {
 key name: String(100);
  description: String(500);
  price: Decimal(10, 2);
}
