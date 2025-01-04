

import { useNavigate } from 'react-router-dom'

const About = ({user}) => {
  let navigate = useNavigate()

  return user ? (
    <div className="about-container">
      <h2>Welcome to GA Mart</h2> 
      <p>
        At <strong>GA Mart</strong>, we’re more than just an online marketplace—we’re a
        community-driven platform committed to empowering small, local grocery
        stores. Our mission is simple: to help these businesses thrive by connecting
        them with a wider customer base through our user-friendly platform.
      </p>

      <p>
        We understand the challenges that small grocery stores face in today’s
        fast-paced and competitive market. That’s why we’ve designed a platform
        that not only showcases their unique products but also provides them with
        the tools, support, and visibility they need to grow. From fresh, local produce
        to hard-to-find specialty items, we’re dedicated to bringing you the best that
        local vendors have to offer.
      </p>

      <p>
        By partnering with <strong>GA Mart</strong>, small grocery stores gain access to
        a broader customer base, a streamlined online presence, and the freedom to
        focus on what they do best—delivering exceptional products and top-notch
        customer service.
      </p>

      <p>
        Together, we are building a stronger network that not only strengthens local
        economies but also supports sustainable growth within the food industry.
        By supporting <strong>GA Mart</strong>, you’re not just purchasing high-quality
        products—you’re helping to create a more connected and vibrant food community.
      </p>

      <p>
        Join us in our mission to uplift small businesses and foster a future where
        local economies thrive and communities flourish.
      </p>
    </div>
  ):<div className="protected">
  <h3>Oops! You must be signed in to do that!</h3>
  <button onClick={() => navigate('/signin')}>Sign In</button>
</div>
}

export default About;

