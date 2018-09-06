import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './Image.module.scss'

const Image = ({ fluid, fixed, alt }) => (
  <Img
    className={styles.image}
    outerWrapperClassName={styles.imageWrap}
    backgroundColor="#6b7f88"
    fluid={fluid ? fluid : null}
    fixed={fixed ? fixed : null}
    alt={alt}
  />
)

Image.propTypes = {
  fluid: PropTypes.object,
  fixed: PropTypes.object,
  alt: PropTypes.string
}

export const projectImage = graphql`
  fragment ImageFluid on ImageSharp {
    fluid(maxWidth: 940, quality: 85) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`

export default Image
