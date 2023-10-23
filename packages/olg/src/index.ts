import { yParser, logger } from '@olgjs/utils';
import getGitRepoInfo from 'git-repo-info';
import prompts from 'prompts';
// const assert = require('assert')
import 'zx/globals';

// 判断本地是否有指定的branch分支
const isBranchExistInLocal = (allbranchStr: string, branch: string) => {
  // 先判断左右两边为空是，只有单纯的branch 字符，如果匹配上，说明本地有此分支
  if (new RegExp(`[\\s]${branch}[\\s]`).test(allbranchStr)) {
    return true;
  }

  // 如果以上情况不存在，只剩下两种可能，指定分支在allbranchStr的最开始，或结束部分

  //  判断是否在开始部分
  if (new RegExp(`^${branch}[\\s]`).test(allbranchStr)) {
    return true;
  }

  //  判断是否在结束部分
  if (new RegExp(`[\\s]${branch}$`).test(allbranchStr)) {
    return true;
  }

  return false;
};

export function assert(v: unknown, message: string) {
  if (!v) {
    logger.error(message);
    process.exit(1);
  }
}

interface IArgs extends yParser.Arguments {
  default?: boolean;
  plugin?: boolean;
  git?: boolean;
  install?: boolean;
}

export default async ({ args }: { args: IArgs }) => {
  const deleteBranch = args.d || args.delete;

  if (args._[0] === 'git' && deleteBranch) {
    const isContinueInstall = await prompts({
      type: 'confirm',
      name: 'value',
      message: `确定要删除本地分支${deleteBranch}吗`,
      initial: false,
    });
    if (!isContinueInstall.value) {
      logger.info(`程序停止执行！`);
      return;
    }

    const { branch } = getGitRepoInfo();
    logger.info(`branch: ${branch}`);

    // check git status
    logger.event('check git status');
    const isGitClean = (await $`git status --porcelain`).stdout.trim().length;
    assert(
      !isGitClean,
      'git status is not clean，本地有未提交代码，请保存代码重试',
    );

    await $`git fetch`;

    const allbranchStr = (await $`git branch`).stdout.trim();
    // 判断本地是否存在要删除的分支, 如果不存在，则只需拉取远程分支同步到本地即可，不需要做进一步操作
    if (!isBranchExistInLocal(allbranchStr, deleteBranch)) {
      logger.info(`已成功删除${deleteBranch}本地缓存！`);
      return;
    }

    if (branch === deleteBranch) {
      await $`git checkout origin/${deleteBranch}`;
      await $`git branch -D ${deleteBranch}`;
      await $`git checkout ${deleteBranch}`;
      logger.info(
        `已成功删除${deleteBranch}本地分支，当前的${deleteBranch}分支为最新远程分支`,
      );
    } else {
      await $`git branch -D ${deleteBranch}`;
      logger.info(`已成功删除${deleteBranch}本地分支！`);
    }
    return;
  }

  logger.warn(`请输入正确命令，如需帮助，执行命令 olg --help`);
  return;
};
