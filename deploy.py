import subprocess
import os

def build():
    build = input('Build? (y/n) ')
    if build == 'y':
        subprocess.run('(cd client && yarn build)', shell = True)
        subprocess.run('rm -rf ./api/public/views', shell = True)
        subprocess.run('cp -r ./client/dist/. ./api/public/views', shell = True)
    else:
        print('Not tagging')

def tagAndBag():
    try:
        latest = subprocess.check_output("git describe --tags --abbrev=0", shell = True).decode('utf-8')
        print(latest)
        minor = latest[-2:]
        print('minor', minor)
        minor = int(minor) + 1
        newTag = latest[:-2] + str(minor)
        print('tag', newTag)
        subprocess.run("git tag " + newTag, shell = True)
        return newTag
    except Exception as e:
        print(e)

def clearModules():
    print('clearing node_modules\n')
    try:
        subprocess.run("rm -rf api/node_modules", shell=True)
        subprocess.run("rm -rf client/node_modules", shell=True)
    except Exception as e:
        print(e)
        exit(1)

def compressProject(tag):
    print('compressing project...\n')
    try:
        artifactPath = 'artifacts'
        if not os.path.exists(artifactPath):
            os.makedirs(artifactPath)
        
        tarballPath = 'hippo-web-app-{tag}.tgz'.format(tag = tag)
        subprocess.run("tar -czvf {}/{} .".format(artifactPath, tarballPath), shell = True)
        return tarballPath
    except Exception as e:
        print(e)

def restoreModules():
    print('restoring node_modules\n')
    try:
        subprocess.run('cd api && yarn', shell=True)
        subprocess.run('cd client && yarn', shell=True)
    except Exception as e:
        print(e)

def main():
    build()
    print('▋___')

    tag = tagAndBag()
    print('▋▋__')

    clearModules()
    print('▋▋▋_')

    tarball = compressProject(tag)
    print('▋▋▋▋')

    restoreModules()
    print('▋▋▋▋▋')
    print('✅ Done! tarball: {tarball}'.format(tarball = tarball))

if __name__ == '__main__':
    main()
