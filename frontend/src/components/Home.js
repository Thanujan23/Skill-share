import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Button, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Divider,
  Paper
} from '@mui/material';
import { 
  Code as CodeIcon, 
  CameraAlt as CameraIcon, 
  Restaurant as RestaurantIcon, 
  Build as BuildIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const features = [
    {
      icon: <CodeIcon fontSize="large" color="primary" />,
      title: "Coding Skills",
      description: "Share your programming expertise and learn from others in the developer community."
    },
    {
      icon: <CameraIcon fontSize="large" color="primary" />,
      title: "Photography",
      description: "Showcase your visual talents and discover photography techniques from professionals."
    },
    {
      icon: <RestaurantIcon fontSize="large" color="primary" />,
      title: "Culinary Arts",
      description: "Exchange recipes, cooking tips, and food presentation skills with fellow food enthusiasts."
    },
    {
      icon: <BuildIcon fontSize="large" color="primary" />,
      title: "DIY Crafts",
      description: "Share your handmade creations and learn new crafting techniques from the community."
    }
  ];

  const socialFeatures = [
    {
      icon: <ShareIcon fontSize="large" color="primary" />,
      title: "Share Content",
      description: "Post images, videos, and articles to showcase your skills and projects."
    },
    {
      icon: <CommentIcon fontSize="large" color="primary" />,
      title: "Engage",
      description: "Leave comments, ask questions, and provide feedback to other community members."
    },
    {
      icon: <FavoriteIcon fontSize="large" color="primary" />,
      title: "Connect",
      description: "Like and share content to build connections with like-minded individuals."
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
            SkillShare Hub
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <IconButton 
                  color="primary" 
                  onClick={() => navigate('/profile')}
                  sx={{ mr: 1 }}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Button 
                  color="inherit" 
                  onClick={handleLogout} 
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')} 
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => navigate('/signup')}
                  startIcon={<PersonAddIcon />}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Share Your Skills, Learn From Others
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Join our community of creators, makers, and learners. Exchange talents, build connections, and grow together.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large"
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://source.unsplash.com/random/600x400/?skills,learning"
                alt="People sharing skills"
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold">
          Explore Skills
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Discover a wide range of talents and share your expertise with the community
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Social Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold">
            Community Features
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Connect with others and share your journey
          </Typography>
          
          <Grid container spacing={4}>
            {socialFeatures.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={0} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom fontWeight="bold">
          What Our Community Says
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Hear from our members about their experiences
        </Typography>
        
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }}>U{item}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        User {item}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Skill Enthusiast
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" paragraph>
                    "This platform has transformed how I learn new skills. The community is supportive and I've made so many connections!"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Ready to Join Our Community?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Create an account today and start sharing your skills with the world
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={() => navigate('/signup')}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                SkillShare Hub
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                A platform for exchanging and acquiring a wide range of talents, from coding to cooking and DIY crafts.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Explore
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Skills
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Community
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Projects
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Company
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Careers
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Contact
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Legal
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Terms of Service
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Cookie Policy
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Connect
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Facebook
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Twitter
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Instagram
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'grey.800' }} />
          <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} SkillShare Hub. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 