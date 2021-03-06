import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import PostTeaser from '../Post/PostTeaser'
import styles from './RelatedPosts.module.scss'

const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            type
            linkurl
            tags
            image {
              childImageSharp {
                ...ImageFluidThumb
              }
            }
          }
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

const postsWithDataFilter = (postsArray, key, valuesToFind) => {
  const newArray = postsArray.filter(post => {
    const frontmatterKey = post.node.frontmatter[key]

    if (
      frontmatterKey !== null &&
      frontmatterKey.some(r => valuesToFind.includes(r))
    ) {
      return post
    }
  })
  return newArray
}

class RelatedPosts extends PureComponent {
  shufflePosts = () => {
    this.forceUpdate()
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const posts = data.allMarkdownRemark.edges
          const filteredPosts = postsWithDataFilter(
            posts,
            'tags',
            this.props.tags
          )

          return (
            <aside className={styles.relatedPosts}>
              <h1 className={styles.title}>Related Posts</h1>
              <ul>
                {filteredPosts
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 6)
                  .map(({ node }) => (
                    <PostTeaser key={node.id} post={node} />
                  ))}
              </ul>
              <button
                className={`${styles.button} btn`}
                onClick={this.shufflePosts}
              >
                Refresh Related Posts
              </button>
            </aside>
          )
        }}
      />
    )
  }
}

RelatedPosts.propTypes = {
  tags: PropTypes.array.isRequired
}

export default RelatedPosts
