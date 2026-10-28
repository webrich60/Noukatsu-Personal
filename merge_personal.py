#!/usr/bin/env python3
# Requires only Python 3.8+, standard library. Does not change original ZIP.
"""12ゲーム入りの元ZIPと個人用フィジカル版を合体し、完成配布ZIPを作る。"""
import sys, shutil, zipfile
from pathlib import Path, PurePosixPath
ROOT=Path(__file__).resolve().parent
OUT=ROOT.parent/'Noukatsu-Personal-Ready'
OUTPUT_ZIP=ROOT.parent/'Noukatsu-Personal-Ready.zip'

def merge(source: Path):
    if not source.exists():
        raise FileNotFoundError(f'元の脳活ゲーム ZIP が見つかりません: {source}')
    with zipfile.ZipFile(source) as zin:
        names=[x.filename for x in zin.infolist() if not x.is_dir()]
        indexes=[x for x in names if x.lower().endswith('index.html') and '__MACOSX/' not in x]
        if not indexes:raise ValueError('元ZIPに index.html がありません。12ゲームのZIPを指定してください。')
        indexes.sort(key=lambda x:(len(PurePosixPath(x).parts),len(x)))
        index=indexes[0]
        # Standard latest ZIP often has index.html in root; may instead have one parent directory.
        prefix=index[:-len('index.html')]
        content=zin.read(index).decode('utf-8-sig')
        if 'showResultScreen' not in content and 'gameScreen' not in content:
            raise ValueError('元の脳活ゲームのZIPではないようです。元ファイルを確認してください。')
        if OUT.exists():shutil.rmtree(OUT)
        OUT.mkdir(parents=True)
        for filename in ('index.html','style.css','app.js','bridge.js'):
            shutil.copy2(ROOT/filename,OUT/filename)
        shutil.copytree(ROOT/'gas',OUT/'gas')
        games=OUT/'games';games.mkdir()
        extracted=0
        for item in zin.infolist():
            if item.is_dir() or not item.filename.startswith(prefix):continue
            rel=item.filename[len(prefix):].replace('\\','/')
            path=PurePosixPath(rel)
            if not rel or path.is_absolute() or '..' in path.parts or any(s.startswith('.') for s in path.parts):continue
            dest=games.joinpath(*path.parts)
            dest.parent.mkdir(parents=True,exist_ok=True)
            with zin.open(item) as f,open(dest,'wb') as target:shutil.copyfileobj(f,target)
            extracted+=1
        html=games/'index.html'
        contents=html.read_text(encoding='utf-8-sig')
        bridge_tag='<script defer src="../bridge.js"></script>'
        if bridge_tag not in contents:
            ix=contents.lower().rfind('</body>')
            if ix<0:raise ValueError('元ゲームのHTMLの閉じタグがありません。')
            contents=contents[:ix]+bridge_tag+'\n'+contents[ix:]
            html.write_text(contents,encoding='utf-8')
        shutil.copy2(ROOT/'README.txt',OUT/'README.txt')
    with zipfile.ZipFile(OUTPUT_ZIP,'w',compression=zipfile.ZIP_DEFLATED) as zout:
        for file in OUT.rglob('*'):
            if file.is_file():zout.write(file,file.relative_to(OUT))
    print('統合成功：元12ゲームを保持、個人版の4種目と記録機能を追加しました。')
    print('抽出した元ゲームのファイル：',extracted)
    print('出力フォルダー:',OUT)
    print('出力ZIP:',OUTPUT_ZIP)
    return OUTPUT_ZIP

if __name__=='__main__':
    if len(sys.argv)<2:
        print('使い方: py merge_personal.py "noukatsu-github-test-12games-v1.6.6-start.zip"')
        sys.exit(2)
    merge(Path(sys.argv[1]))
