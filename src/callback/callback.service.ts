/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
import {
	BadRequestException,
	Injectable,
	Logger,
	RawBodyRequest,
	Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Webhook } from 'svix';

@Injectable()
export class CallbackService {
	private readonly logger = new Logger(CallbackService.name);

	async syncDatabaseFromLearner(@Req() req: RawBodyRequest<Request>) {
		const SIGNING_SECRET = process.env.SIGNING_SECRET;

		if (!SIGNING_SECRET) {
			throw new BadRequestException(
				'Please add SIGNING_SECRET from Clerk Dashboard to .env',
			);
		}

		this.logger.debug('Request', req);

		// Create new Svix instance with secret
		const wh = new Webhook(SIGNING_SECRET);

		// Get headers and body from the request
		const headers = req.headers;
		const payload = req.rawBody?.toString('utf8') || '';

		// Extract Svix headers for verification
		const svix_id = headers['svix-id'];
		const svix_timestamp = headers['svix-timestamp'];
		const svix_signature = headers['svix-signature'];

		// If there are no headers, throw an error
		if (!svix_id || !svix_timestamp || !svix_signature) {
			throw new BadRequestException('Error: Missing svix headers');
		}

		let evt: any;

		// Attempt to verify the incoming webhook
		try {
			evt = wh.verify(payload, {
				'svix-id': svix_id as string,
				'svix-timestamp': svix_timestamp as string,
				'svix-signature': svix_signature as string,
			});
		} catch (err) {
			this.logger.error('Error: Could not verify webhook:', err.message);

			throw new BadRequestException(err.message);
		}

		// Process the payload (log it in this case)
		const { id } = evt.data;
		const eventType = evt.type;

		this.logger.log(
			`Received webhook with ID ${id} and event type of ${eventType}`,
		);
		this.logger.log('Webhook payload:', evt.data);

		// Optionally, handle any further processing with the payload data
		return { success: true, message: 'Webhook received' };
	}
}
