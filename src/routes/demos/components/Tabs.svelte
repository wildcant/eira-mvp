<script>
	import Tab from '$components/ui/tabs/Tab.svelte';
	import TabList from '$components/ui/tabs/TabList.svelte';
	import TabPanel from '$components/ui/tabs/TabPanel.svelte';
	import Tabs from '$components/ui/tabs/Tabs.svelte';
</script>

<h1>Tabs</h1>
<Tabs>
	<TabList slot="list">
		<Tab>Account</Tab>
		<Tab>Password</Tab>
	</TabList>
	<TabPanel>
		<p class="description">Make changes to your account here. Click save when you're done.</p>
		<fieldset>
			<label for="name"> Name </label>
			<input id="name" value="Thomas G. Lopes" />
		</fieldset>

		<div class="actions">
			<button>Save changes</button>
		</div>
	</TabPanel>
	<TabPanel>
		<p class="description">Change your password here. Click save when you're done.</p>
		<fieldset>
			<label for="new"> New password </label>
			<input id="new" type="password" />
		</fieldset>
		<div class="actions">
			<button>Save changes</button>
		</div>
	</TabPanel>
</Tabs>
