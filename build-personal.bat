@echo off
chcp 65001 >nul
cd /d "%~dp0"
if "%~1"=="" (
  echo.
  echo 元の12ゲームZIPを、このbatファイルにドラッグ＆ドロップしてください。
  echo 例: noukatsu-github-test-12games-v1.6.6-start.zip
  echo.
  pause
  exit /b 2
)
py "%~dp0merge_personal.py" "%~1"
if errorlevel 1 (
  echo.
  echo 失敗しました。Python 3がインストールされているか、元ZIPが正しいか確認してください。
) else (
  echo.
  echo 完了です。Noukatsu-Personal-Ready.zip を新しいGitHubリポジトリで公開してください。
)
pause
