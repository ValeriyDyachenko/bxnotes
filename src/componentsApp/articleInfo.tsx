import { GoPencil } from 'react-icons/go'
import React, { FC } from 'react'
import styled from 'styled-components'
import { slugIsArticle } from '../utils/path'
import { rhythm } from '../componentsLibrary/theme/typography'
import { Link } from '../componentsLibrary/baseComponents/link'

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  order: 1;
`

const OriginWrapper = styled.div`
  width: 238px;
  margin-top: 20px;
  flex-grow: 1;
  margin: ${rhythm(0.5)} ${rhythm(0.5)};
`

const Origin = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
  border-right: 2px solid ${({ theme }) => theme.global.hover};
  padding: 0 24px 0 0;
  margin-left: -24px;
  text-align: right;
  height: 44px;
  justify-content: flex-end;
  & a {
    font-weight: 300;
    display: contents;
  }
`

interface Props {
  slug: string
  origin?: string
  date?: number
}

export const ArticleInfo: FC<Props> = ({ slug, origin, date }) => {
  if (!slugIsArticle(slug)) {
    return null
  }
  const articleGithubPath = `https://github.com/ValeriyDyachenko/bxnotes/blob/master${slug.replace(
    /^\/conspect\//,
    '/content/'
  )}`.replace(/\/$/, '.md')
  return (
    <AdditionalInfo>
      <Link href={articleGithubPath} size="md" view="outline">
        <GoPencil /> &nbsp; редактировать статью
      </Link>
      <OriginWrapper>
        {origin && (
          <Origin
            dangerouslySetInnerHTML={{
              __html: `Источник &mdash;&nbsp;${origin}`,
            }}
          />
        )}
        {date && (
          <Origin>
            обновлено{' '}
            {new Date(Number(date)).toLocaleString('ru', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Origin>
        )}
      </OriginWrapper>
    </AdditionalInfo>
  )
}
