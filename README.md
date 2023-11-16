<h1 align="center"> Netflix </h1>
<div align="center"> 포트폴리오용 넷플릭스 클론코딩입니다 </div>

<br>
<br>


### 배포 링크
https://silverj7.github.io/portfolio

### 시작하기
<pre><code>git clone https://github.com/silverj7/silverj7.github.io.git</code></pre>
<pre><code>yarn</code></pre>
<pre><code>yarn develop</code></pre>

### 사용 기술
- gatsby
- react
- typescript
- scss

### 폴더 구조
(* scss파일들은 해당하는 컴포넌트 폴더와 같이 배치되어 있습니다)

- src
  - components
    - netflix
      - dummy : 가상 data들이 정리 되어 있는 폴더입니다
      - useMedia : mediabreak 코드가 따로 정리되어있는 폴더입니다 (gnb용)
      - view : view(실제로 보여지는)에 관련된 컴포넌트들이 모인 폴더입니다
        - carousel : 재사용 가능한 슬라이드 아이템 컴포넌트들이 모인 폴더입니다
        - gnbmenu : gnbMenu(글로벌 네비게이션 바) 컴포넌트가 분리되어 있는 폴더입니다
        - mainMedia : 사이트 접속시 제일 먼저 보이는 메인 화면에 관한 폴더입니다
              
