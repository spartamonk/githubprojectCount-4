import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = useGlobalContext()

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    language &&
      (total[language]
        ? (total[language] = {
            ...total[language],
            value: total[language].value + 1,
            stars: total[language].stars + stargazers_count
          })
        : (total[language] = {
            label: language,
            value: 1,
            stars: stargazers_count,
          }))
    return total;
  }, {})
  const mostLanguageTaken = Object.values(languages).sort((a,b)=>b.value- a.value).slice(0,5);
  const mostPopularLangauge = Object.values(languages).map(item=> {
    const {label, stars} = item;
    return {
      label,
      value: stars
    }
  }).sort((a,b)=>b.value -a.value).slice(0,5)

  let {stars, forks} = repos.reduce((total,item)=> {
    const { stargazers_count, forks_count, name } = item
    total.stars[stargazers_count] = {label:name, value: stargazers_count};
    total.forks[forks_count] = {label: name, value: forks_count};
    return total
  },{stars: {}, forks: {}})

  forks =Object.values(forks).slice(-5).reverse();
  stars = Object.values(stars).slice(-5).reverse();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostLanguageTaken} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopularLangauge} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
