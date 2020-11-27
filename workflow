# deploy.yml
name: engine
on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # 切换分支
      - name: Checkout
        uses: actions/checkout@master
      # 下载 git submodule
      - uses: srt32/git-actions@v0.0.3
        with:
          args: git submodule update --init --recursive
      # 使用 node:10
      - name: use Node.js 10
        uses: actions/setup-node@v1
        with:
          node-version: 10
      # npm install
      - name: npm install
        run: |
          npm install -g hexo-cli
          npm install
        env:
          CI: true
      # build
      - name: hexo build
        run: |
          hexo clean
          hexo generate
        env:
          CI: true

      # Deploy
      - name: Deploy
        uses: easingthemes/ssh-deploy@v2.0.7
        env:
          SSH_PRIVATE_KEY: ${{ secrets.ACCESS_TOKEN }}
          ARGS: "-avz --delete"
          SOURCE: "public/"
          REMOTE_HOST: http://81.69.12.254
          REMOTE_USER: root
          TARGET: ${{ secrets.TARGET }}
