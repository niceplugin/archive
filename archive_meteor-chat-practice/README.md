# ๐ ๋ชฉํ

์ด๋ฒ ํ๋ก์ ํธ๋ ๊ฐ๋จํ ์ฑํ ์ฑ์ ๋ง๋๋ ๊ฒ์ผ๋ก,
๋ค์๊ณผ ๊ฐ์ ๋ชฉํ๋ฅผ ์งํฅํฉ๋๋ค.

- ํ/์ญ ๊ฐ๋๊ณผ ์๋ฌ
- ๋ฉ์๋ ๊ฐ๋๊ณผ ์๋ฌ
- ๋ถํธ์คํธ๋ฉ ์๋ฌ
- ํ๋ก์ ํธ ๊ธฐ๋ณธ ๊ตฌ์กฐ ํ์
- ์ฝ๋ ๊ต์ 

> ์ด๋ฒ ํ๋ก์ ํธ๋ ํด๋ผ์ฐ๋ DB์ ์ฐ๊ฒฐ๋์ด ์๋ ์ํ ์ด๋ฏ๋ก,
> ๊ฐ๋ฐ๊ฐ ํ๋ก์ ํธ ์คํ์ `meteor run`์ด ์๋, `npm run dev`๋ก ํ๊ธฐ ๋ฐ๋๋๋ค.

# โ ํ  ์ผ

๋ค์๊ณผ ๊ฐ์ ํ์ด์ง๋ก ์ผ๋ฐ์ ์ธ ์ฑํ ์ฑ ๊ธฐ๋ฅ์ ๊ตฌํํด์ผ ํฉ๋๋ค.

## ๊ณตํต์ฌํญ

์๋ฒ์ ํต์ ๊ฐ ์๋ต์ ์์ง ๋ฐ์ง ์์ ๊ฒฝ์ฐ, UX๋ฅผ ๊ณ ๋ คํ UI ์ํ ๋ณ๊ฒฝ์ด ํ์ํฉ๋๋ค.
์๋ฅผ๋ค์ด:

> ํ์๊ฐ์ ๋ฒํผ ํด๋ฆญ ํ, ์๋ต์ ๋ฐ๊ธฐ ์ ๊น์ง ์ธํ์ด๋ ๋ฒํผ ํด๋ฆญ ๋๋ฉด ์๋จ. 

## ํ์ด์ง

- ํ์๊ฐ์
  - ํ๋กํ ์ฌ์ง ์๋ก๋ ๊ธฐ๋ฅ<br>
    ์คํ ๋ฆฌ์ง ์๋ฒ๊ฐ ์์ผ๋ฏ๋ก ์ปฌ๋ ์์ `base64` ํฌ๋ฉง์ผ๋ก ์ ์ฅ
  - ์ผ๋ฐ/์ด๋๋ฏผ ๊ตฌ๋ถ
- ๋ก๊ทธ์ธ
  - ์์ด๋ ๊ธฐ์ต ์ฑํฌ ๊ธฐ๋ฅ
- ๋ก๊ทธ์์
  - ๋ก๊ทธ์์ ์ดํ ๋ฉ์ธ ํ์ด์ง๋ก `replace` (`go` ๊ธฐ๋ฅ ์๋)
- ์ฑํ๋ฐฉ ๋ฆฌ์คํธ
  - ๋ฆฌ์คํธ ๋ณ ๋ง์ง๋ง ๋ฉ์ธ์ง ๋ธ์ถ
  - ๋ง์ง๋ง ๋ฉ์ธ์ง๋ ์ค์๊ฐ ์๋ฐ์ดํธ
  - ๋ชจ๋๊ฐ ๋๊ฐ ๋ฐฉ์ ๋ฆฌ์คํธ์์ ๋ณด์ด๋ฉด ์๋จ
  - ๋ฐฉ ์ ๋ ฌ์ ๋ง์ง๋ง ๋ฉ์ธ์ง ์์  ์์
  - ์์ง ์ฝ์ง ์์ ๋ฉ์์ง ์ฌ๋ถ ํ์
- ์ฑํ๋ฐฉ
  - ๋ฉ์ธ์ง ์๋ ฅ ๊ธฐ๋ฅ
  - ๋์ ํ์ธ์ ๋ฉ์ธ์ง ์ข์ฐ ๋ถ๋ฆฌ
  - ์ด๋๋ฏผ ๋ฉ์ธ์ง๋ ์ค์ ๊ณต์ง์ฒ๋ผ ํ์
  - ์ฑํ๋ฐฉ ๋๊ฐ๊ธฐ/๋ค๋ก๊ฐ๊ธฐ ๊ธฐ๋ฅ ๊ตฌ๋ถ ํ์
  - ๋ฉ์ธ์ง 1ํ ์ ์ก์ ์ฌ๋ฌ ์ค ์/์ถ๋ ฅ ๊ฐ๋ฅ
  - ์ต๊ทผ ๋ฉ์ธ์ง๊ฐ ๋งจ ์๋ ๋ฐฐ์น๋๋๋ก ์ ๋ ฌ

## ์ญํ ๋ถ๋ด

์ญํ ์ ๋๋ต์ ์ผ๋ก ๋ค์๊ณผ ๊ฐ์ด ๋๋ฉ๋๋ค.

- A: ํ์๊ฐ์/๋ก๊ทธ์ธ/๋ก๊ทธ์์/๋ฉ์๋(์๋ฒ)
- B: ์ฑํ๋ฐฉ ๋ฆฌ์คํธ/ํ์ญ-๋ฃธ๋ฆฌ์คํธ
- C: ์ฑํ๋ฐฉ/ํ์ญ-๋ฉ์ธ์ง

# โ ๏ธ ์ฐธ๊ณ ์ฌํญ

- โ๏ธPR์ ๋งค์ผ 19์ ์ด๋ด์ ๋ฑ๋กํฉ๋๋ค.
- โ๏ธ์ฃผ์/์ปค๋ฐ์ ํ๊ธ๋ก ํฉ๋๋ค.
- ํ์์ ํจํค์ง ์ค์น ๊ฐ๋ฅํ์ง๋ง, ๊ผญ ํ์ํ์ง ํ ๋ฒ ๋ ๊ณ ๋ฏผํด๋ด์ผ ํฉ๋๋ค.
- ์ด์  ์กฐํ๋ฅผ ์ ์ธํ ๋ชจ๋  ์ปฌ๋ ์์ ํด๋ผ์ด์ธํธ์์ ์กฐ์ํ  ์ ์์ต๋๋ค.
- ์ปฌ๋ ์ ์ ๋ณด ์กฐ์์ ๋ฉ์๋๋ฅผ ํตํด ์๋ฒ์์ ์งํํด์ผ ํฉ๋๋ค.
- ์ปฌ๋ ์ ์กฐํ๋ ์๋ฒ์์ ํผ๋ธ๋ฆฌ์ผ์ด์์ ํด์ค ์ ๋ณด์ ํ์์ ๊ฐ๋ฅํฉ๋๋ค.
- ํ์์ ํด๋ผ์ด์ธํธ๋ ์๋ ์ ํ ์์ด ๋ก์ปฌ ์ปฌ๋ ์์ ๋ง๋ค์ด CRUD ๊ฐ๋ฅํฉ๋๋ค.
- ๊ธ์ง์ฌํญ์ ํด๋นํ์ง ์๋ ๊ฒฝ์ฐ, ํ์์ ๋ฐ๋ผ์ ์ฝ๋ ์์ฑ/์์  ๊ฐ๋ฅํฉ๋๋ค.
- Meteor ์๋ฌ์ ๋น์ค์ ๋๊ธฐ์ํด `import/client/styles|ui` ์งํ ์ํจ

# โ ๊ธ์ง์ฌํญ

๋ค์ ๋๋ ํ ๋ฆฌ ๋๋ ํ์ผ์ ์์ ํ๋ฉด ์๋ฉ๋๋ค.
์์ ์ด ํ์ํ  ๊ฒฝ์ฐ, `@Mike`์๊ฒ ์์ฒญํด์ผ ํฉ๋๋ค:

- client/
- server/
- imports/client/layout/
- imports/client/styles/
- imports/client/ui/
- imports/routes/
- imports/util/routeEnter.js
- test/

๊ทธ ์ธ:
- **PR ์น์ธ๋ ๋ธ๋์น**๋ ์ญ์ ํ๊ณ , ์๋ก์ด ๋ธ๋์น๋ฅผ ์์ฑํด์ ์ ์์์ ์์ํฉ๋๋ค.
- ๋ณธ์ธ์๊ฒ ํ์ํ ๊ธฐ๋ฅ์ด ํ์ธ์ ์ญํ  ๋ด์ ์์ผ๋ฉด, ์์ฒญ์ผ๋ก ํด๊ฒฐํด์ผ ํฉ๋๋ค.<br>
  ์ง์  ์์ /์กฐ์ ๊ธ์ง.

# ๐๏ธ ์ผ์ 

- 2022-12-05(์) - ๊ฐ๋ฐ ํ๊ฒฝ ์ค์ , ์๊ฐ์  ๊ตฌํ
- 2022-12-06(ํ) - ์๊ฐ์  ๊ตฌํ, ๊ธฐ๋ฅ ๊ฐ๋ฐ
- 2022-12-07(์) - ๊ธฐ๋ฅ ๊ฐ๋ฐ
- 2022-12-08(๋ชฉ) - ๊ธฐ๋ฅ ๊ฐ๋ฐ
- 2022-12-09(๊ธ) - ์ํ QA, ์ ์ฌ์ ๊น์ง PR, ๊ฐ์ธ๋ฆฌ๋ทฐ

