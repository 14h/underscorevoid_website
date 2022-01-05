import { NextApiRequest, NextApiResponse } from 'next';
import TelegramBot from 'node-telegram-bot-api';
import {WebhookEvent} from "@octokit/webhooks-types";

const get_message = (event: WebhookEvent): string | null => {
    if (
        !event
        || !('sender' in event)
        || !('repository' in event)
    ) {
        return null;
    }

    const author_link = event?.sender?.html_url ?? '';
    const author_name = event?.sender?.login ?? '';

    if ('commits' in event) {
        // handle commits

        const commit_count = event?.commits?.length ?? 0;
        const commits = event?.commits ?? [];

        return `⥂ GitHub ⟹ <a href="${author_link}">${author_name}</a> ${event.forced ? 'forced' : ''} pushed (<a href="${event.compare}">${commit_count}</a> commits) to <a href="${event.repository.html_url}">${event.repository.name}</a> (${event.ref}): \n ${commits.map(commit => `-> ${commit.message} (<a href="${commit.url}">${commit.modified.length} files changed</a>) \n`)}`;
    }

    if (
        'pull_request' in event
        && 'commits' in event.pull_request
    ) {

        return `⥂ GitHub ⟹ <a href="${author_link}">${author_name}</a> ${event.action} pull-request to <a href="${event.repository.html_url}">${event.repository.name}</a> with [<a href="${event.pull_request.html_url}/commits">${event.pull_request.commits} commits</a>; <a href="${event.pull_request.html_url}/files">${event.pull_request.changed_files} changed files</a> (+${event.pull_request.additions}/-${event.pull_request.deletions})]\n<a href="${event.pull_request.html_url}">"${event.pull_request.title}" (#${event.pull_request.number})</a>`
    }

    return null;
};

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    const { service } = request.query;

    bot.sendMessage(
        process.env.CHANNEL_ID_GLS_EOP,
        service,
        {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        }
    ).then(() =>
        response.end(`SUCCESS ${service}!`),
    ).catch((err) => {
        console.error(err);

        response.end(`ERROR ${service}!`);
    }).finally(() => response.end(`WHAT ${service}!`));
}