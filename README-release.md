
## 發佈版號流程
1. 當要部署到 dev、prod 環境時候需要先將所有 code 合回 master
2. 執行發佈版號 選擇要情境 script (會自動幫你更新 package.json version 與 CHANGELOG.md) （版號規則可參考: https://blog.csdn.net/weixin_40817115/article/details/90384398）
    - 大版號發佈

      ```
      npm run release -- --release-as major
      ```

    - 中版號 （例維更新）

      ```
      npm run release -- --release-as minor
      ```

    - 小版號 （緊急更新）

      ```
      npm run release -- --release-as patch
      ```

    - alpha (This will tag the version as: 1.0.1-alpha.0)

      ```
      npm run release -- --prerelease alpha
      ```

    - prerelease (This will tag your version as: 1.0.1-0)

      ```
      npm run release -- --prerelease
      ```
    - 直接指定版號

      ```
      npm run release -- --release-as 1.1.0
      ```
3. 此時將 tag 更新到 remote，為了部署時候判斷是否有更新到
    ```
    npm run release-tag
    ```
