import { formatRichText } from '@/libs/utils';
import { type Blog } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import Profile from '../Profile';

type Props = {
  data: Blog;
};

export default function Article({ data }: Props) {
  // data.contentが配列であることを確認
  if (!Array.isArray(data.content)) {
    return <div>Content is not available</div>;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{data.title}</h1>
      <TagList tags={data.tags} />
      <p className={styles.description}>{data.description}</p>
      <div className={styles.meta}>
        {data.writer && (
          <div className={styles.writer}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${data.writer?.image?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${data.writer?.image?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
              />
              <img
                src={data.writer?.image?.url}
                alt=""
                className={styles.writerIcon}
                width={data.writer?.image?.width}
                height={data.writer?.image?.height}
              />
            </picture>
            <span className={styles.writerName}>{data.writer?.name}</span>
          </div>
        )}
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </div>
      <picture>
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcSet={`${data.thumbnail?.url}?fm=webp&w=414 1x, ${data.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
        />
        <source
          type="image/webp"
          srcSet={`${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
        />
        <img
          src={data.thumbnail?.url}
          alt=""
          className={styles.thumbnail}
          width={data.thumbnail?.width}
          height={data.thumbnail?.height}
        />
      </picture>
      {data.content.map((section, index) => {
        if (section.fieldId === 'body') {
          return (
            <div
              key={index}
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: formatRichText(section.body || ''),
              }}
            />
          );
        } else if (section.fieldId === 'html') {
          return (
            <div
              key={index}
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: formatRichText(section.html || ''),
              }}
            />
          );
        } else {
          return null;
        }
      })}
      <Profile writer={data.writer} />
    </main>
  );
}
