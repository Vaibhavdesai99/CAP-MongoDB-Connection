namespace myProject;

entity Products {
  key ID: Integer;
  name: String(100);
  description: String(500);
  price: Decimal(10, 2);
}
