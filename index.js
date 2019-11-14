const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('github_token', { required: true });

        const client = new github.GitHub(token);
        const pullRequestNumber = github.context.payload.number;
        const pullRequest = github.context.payload.pull_request;
                
        const commentBody = "comment body";
        const response = await client.issues.createComment({
            owner: pullRequest.base.repo.owner.login,
            repo: pullRequest.base.repo.name,
            issue_number: pullRequestNumber,
            body: commentBody
        });

        console.log(`This is the given PR: ${pullRequestNumber}.`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();