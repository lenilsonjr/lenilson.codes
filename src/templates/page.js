import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components';

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

import { Hero, Container, Heading } from 'react-bulma-components';

const PostHero = styled(Hero)`
    background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${props => props.backgroundImage}')
`;

const PostContainer = styled(Container)`
    padding-top: 1rem;
    padding-bottom: 1rem;
    max-width: 1152px;
    width: 1152px;

    padding-right: 8rem;
    padding-left: 8rem;

    font-size: 22px;
`;

const Page = ({ data, location }) => {
    const page = data.ghostPage

    return (
            <>
                <MetaData
                    data={data}
                    location={location}
                    type="article"
                />
                <Helmet>
                    <style type="text/css">{`${page.codeinjection_styles}`}</style>
                </Helmet>
                <Layout>
                    <PostHero color="dark" size="medium" backgroundImage={page.feature_image}>
                      <Hero.Body>
                        <Container align="center">
                          <Heading size={1}>{page.title}</Heading>
                          <Heading subtitle>{page.created_at_pretty}</Heading>
                        </Container>
                      </Hero.Body>
                    </PostHero>
                    <PostContainer>
                        <section
                            className="content load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: page.html }}
                        />
                    </PostContainer>
                </Layout>
            </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
