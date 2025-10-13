import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import './CategoriesPage.css';

// Import category images (you'll need to add these images to your assets)
// For now using placeholder images from Unsplash
const CategoriesPage = () => {
  const categoriesData = [
    {
      id: 1,
      title: "Up to 70% off | Top categories from Small...",
      items: [
        { name: "Home decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" },
        { name: "Clothing", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop" },
        { name: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" },
        { name: "Beauty products", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop" }
      ],
      cta: "See all offers"
    },
    {
      id: 2,
      title: "Collection from Small & medium businesses",
      items: [
        {
          name: "GST bachat utsav | Products with savings",
          image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=300&h=200&fit=crop",
          badge: "Flat 10% cashback*"
        },
        {
          name: "Amazon Launchpad",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop"
        },
        {
          name: "Home decor from stores nearby",
          image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&fit=crop"
        },
        {
          name: "Kitchen products from Small...",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
        }
      ],
      cta: "See all offers"
    },
    {
      id: 3,
      title: "Up to 70% Off | Women-led festive picks",
      items: [
        { name: "Kitchen storages & more", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop" },
        { name: "Decorative diyas", image: "https://images.unsplash.com/photo-1605311366560-18d04fc96cbd?w=300&h=200&fit=crop" },
        { name: "Decors & more", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&fit=crop" },
        { name: "Women's wear", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=200&fit=crop" }
      ],
      cta: "See all offers"
    },
    {
      id: 4,
      title: "Up to 80% off | Authentic artisanal festive...",
      items: [
        { name: "Kitchen essentials & more", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop" },
        { name: "Women's wear", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=200&fit=crop" },
        { name: "Toddler toys", image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=300&h=200&fit=crop" },
        { name: "Handcrafted furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" }
      ],
      cta: "See all offers"
    }
  ];

  return (
    <div className="categories-page">
      <Container fluid className="py-4">
        {/* Page Header */}
        <div className="page-header mb-4">
          <h1 className="page-title">Festive Categories</h1>
          <p className="page-subtitle">Discover amazing deals across all categories</p>
        </div>

        {/* Categories Grid */}
        <Row className="g-4">
          {categoriesData.map((category) => (
            <Col key={category.id} lg={6} xl={3} className="mb-4">
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>

        {/* Additional Categories Section */}
        <Row className="mt-5">
          <Col>
            <div className="additional-categories">
              <h3 className="section-title mb-4">More Categories to Explore</h3>
              <Row className="g-3">
                {[
                  "Electronics", "Fashion", "Home & Kitchen", "Beauty & Personal Care",
                  "Sports & Fitness", "Books", "Toys & Games", "Automotive",
                  "Grocery", "Movies & Music", "Health & Household", "Pet Supplies"
                ].map((cat, index) => (
                  <Col key={index} xs={6} sm={4} md={3} lg={2}>
                    <Link to="/products" className="category-tile">
                      <div className="tile-content">
                        <span>{cat}</span>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const CategoryCard = ({ category }) => {
  return (
    <Card className="category-card h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        {/* Card Header */}
        <div className="card-header mb-3">
          <h5 className="card-title mb-2">{category.title}</h5>
        </div>

        {/* Category Items Grid */}
        <div className="category-items-grid mb-3">
          <Row className="g-2">
            {category.items.map((item, index) => (
              <Col key={index} xs={6}>
                <div className="category-item">
                  <div className="item-image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    {item.badge && (
                      <Badge bg="danger" className="item-badge">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="item-name mb-0">{item.name}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA Button */}
        <div className="card-footer mt-auto">
          <Button variant="outline-warning" className="w-100 see-all-btn">
            {category.cta}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CategoriesPage;