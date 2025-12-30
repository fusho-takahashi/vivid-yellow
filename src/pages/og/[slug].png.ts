import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import satori from 'satori';
import sharp from 'sharp';
import { getPost, getPosts } from '../../lib/microcms'; // microCMSクライアント

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }

  const blog = await getPost(slug);

  // タイトルの長さに応じてフォントサイズを調整
  const titleLength = blog.title.length;
  let titleFontSize = 64;
  if (titleLength > 40) {
    titleFontSize = 48;
  } else if (titleLength > 30) {
    titleFontSize = 56;
  }

  // フォントを読み込む
  const notoSansData = await fs.readFile('./public/fonts/NotoSansJP-Bold.ttf');
  const bangersData = await fs.readFile('./public/fonts/Bangers-Regular.ttf');

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFF44F 50%, #FFEB3B 100%)',
          padding: '80px',
          position: 'relative',
        },
        children: [
          // 装飾的な円形要素（背景）
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                top: '-100px',
                right: '-100px',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(255, 215, 0, 0.3)',
                bottom: '-80px',
                left: '-80px',
              },
            },
          },
          // タイトル部分
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '60px 80px',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                maxWidth: '900px',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: titleFontSize,
                      fontWeight: 'bold',
                      fontFamily: 'Noto Sans JP',
                      color: '#333',
                      textAlign: 'center',
                      lineHeight: 1.4,
                      marginBottom: '30px',
                      maxWidth: '800px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                    children: blog.title,
                  },
                },
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: 72,
                      fontFamily: 'Bangers',
                      color: '#FFD700',
                      textShadow: '3px 3px 0px #333',
                      letterSpacing: '2px',
                    },
                    children: 'VIVID YELLOW',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: notoSansData,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Bangers',
          data: bangersData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

export async function getStaticPaths() {
  const { contents } = await getPosts();
  
  return contents.map((blog) => ({
    params: { slug: blog.id },
  }));
}