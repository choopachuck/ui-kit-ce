import * as fs from 'fs'

class TreeNode {
  path: string
  children: TreeNode[]

  constructor(path: string) {
    this.path = path
    this.children = []
  }
}

function buildTree(rootPath: string) {
  const root = new TreeNode(rootPath)

  const stack = [root]

  while (stack.length) {
    const currentNode = stack.pop()

    if (currentNode) {
      const children = fs.readdirSync(currentNode.path)

      for (const child of children) {
        const childPath = `${currentNode.path}/${child}`
        const childNode = new TreeNode(childPath)

        currentNode.children.push(childNode)

        if (fs.statSync(childNode.path).isDirectory()) {
          stack.push(childNode)
        }
      }
    }
  }

  return root
}

/**
 * При изменении конфигурации сборки, процесс компиляции может
 * закончиться успешно, но конечный результат не будет соответствовать ожидаемому.
 * Например файловая структура выходных данных изменится и поля
 *
 * "main": "dist/index.js",
 * "typings": "dist/index.d.ts",
 *
 * уже будут указывать на не существующие ресурсы.
 *
 * Данный набор тестов должен помочь обнаружить такие проблемы.
 */
describe.skip('check dist structures folder', () => {
  const packagesForBuild = fs.readdirSync('packages').filter((name) => {
    // Проверяем, должен ли пакет публиковаться в репозиторий
    return !JSON.parse(fs.readFileSync(`packages/${name}/package.json`, 'utf8'))
      .private
  })

  // TODO: придумать как встроить в паплайн
  // этот тест будет работать только если были собраны пакеты
  it.skip.each(packagesForBuild)('on %s package', (name) => {
    const distPath = `packages/${name}/dist`

    expect(buildTree(distPath)).toMatchSnapshot()
  })
})
